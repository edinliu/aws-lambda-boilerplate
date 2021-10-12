# taiji-external-twb-functions

This is how to setup AWS credentials on the local:

1. Sign in to AWS console
2. Go to your AWS account overview
3. Account menu in the upper-right (has your name on it)
4. sub-menu: Security Credentials
5. Copy <Access Key ID>
6. Copy <Secret Access Key>
7. Run on local serverless config credentials --provider aws --key <Access Key ID> --secret <Secret Access Key>