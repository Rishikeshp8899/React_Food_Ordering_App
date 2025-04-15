   
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-south-1_wpxtHFFbc",
    ClientId: "7rku8ljqdu5bbf3356mhalbbuf"
}

export default new CognitoUserPool(poolData);