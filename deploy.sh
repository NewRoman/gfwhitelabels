#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=growthfountain-frontend
ls
DIR=/
#aws  s3 cp $DIR s3://$BUCKET/ --profile "$PROFILE"  --recursive
