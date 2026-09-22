#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
// import { InfraStack } from "../lib/portfolio-stack";
import { PortfolioStack } from "../lib/portfolio-stack";

const app = new cdk.App();

new PortfolioStack(app, "PortfolioStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
