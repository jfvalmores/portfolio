import { Construct } from "constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as targets from "aws-cdk-lib/aws-route53-targets";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = process.env.DOMAIN_NAME ?? "example.com";
    const wwwDomainName = `www.${domainName}`;

    /*
     * Route 53
     *
     * Looks up the existing hosted zone for your domain.
     *
     * Make sure the domain is already using Route 53
     * before deploying this stack.
     */
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    /*
     * ACM Certificate
     *
     * IMPORTANT:
     * CloudFront certificates must be created in us-east-1.
     *
     * Therefore this CDK stack should be deployed to us-east-1.
     */
    const certificate = new acm.Certificate(this, "Certificate", {
      domainName,
      subjectAlternativeNames: [wwwDomainName],
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    /*
     * S3 Bucket
     *
     * The bucket is intentionally private.
     *
     * CloudFront accesses the bucket using Origin Access Control.
     */
    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // Prevent accidental deletion of the bucket.
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      // Prevent CDK from deleting website files during stack deletion.
      autoDeleteObjects: false,
    });

    /*
     * CloudFront Distribution
     *
     * S3BucketOrigin.withOriginAccessControl() automatically
     * configures CloudFront Origin Access Control (OAC).
     */
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      domainNames: [domainName, wwwDomainName],
      certificate,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },

      /*
       * React/Vite SPA routing.
       *
       * For example:
       *
       * /about
       * /projects
       * /contact
       *
       * CloudFront should serve index.html rather than
       * returning a 404 from S3.
       */
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
      ],

      /*
       * IPv6 support.
       */
      enableIpv6: true,

      /*
       * HTTP/2 and HTTP/3 support.
       */
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
    });

    /*
     * Route 53
     *
     * justinevalmores.com → CloudFront
     */
    new route53.ARecord(this, "RootAliasRecord", {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
    });

    /*
     * www.justinevalmores.com → CloudFront
     */
    new route53.ARecord(this, "WwwAliasRecord", {
      zone: hostedZone,
      recordName: "www",
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
    });

    /*
     * CloudFormation outputs
     *
     * These are useful for your GitHub Actions workflow.
     */
    new cdk.CfnOutput(this, "BucketName", {
      value: websiteBucket.bucketName,
      description: "S3 bucket containing the portfolio",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
      description: "CloudFront distribution ID",
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
      description: "CloudFront distribution domain",
    });

    new cdk.CfnOutput(this, "WebsiteUrl", {
      value: `https://${domainName}`,
      description: "Portfolio website",
    });
  }
}
