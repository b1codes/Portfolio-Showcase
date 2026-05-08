variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project, used for naming resources."
  type        = string
  default     = "portfolio-showcase"
}

variable "domain_name" {
  description = "The custom domain name for the portfolio (e.g., example.com)."
  type        = string
}
