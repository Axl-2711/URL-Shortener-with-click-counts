import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

export const restrictToLoggedinUserOnly = (req, res, next) => {

    try {

        const fetchUserToken = req.cookies.jwtToken;
        if (!fetchUserToken) return res.redirect("/login");


        //If that user has jwt token, then we will verify that token with our jwt library if it fake token or not, then only we allow to access homepage of application -
        //SECRET_KEY created using node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
        const verifyUserToken = jwt.verify(fetchUserToken, process.env.SECRET_KEY);

        if (!verifyUserToken) return res.redirect("/login");

        //if everything went fine, We store that user in http headers of the client with a key name(for identifying that user indivisually) -

        req.verifiedJWTUserId = verifyUserToken; //to see each user with verfied token details -

        next();


    } catch (error) {
        console.log("Error", error);
        return res.redirect("/login");

    }

}

export const checkAuthAtStaticLoginAndSignup = (req, res, next) => {

    try {


        const fetchToken = req.cookies.jwtToken;

        if (!fetchToken) {
            return next();

        } else {


            const verifyjwtToken = jwt.verify(fetchToken, process.env.SECRET_KEY);

            if (!verifyjwtToken) return next();

            // if everything went fine, we just keep the user
            req.verifiedJWTUserId = verifyjwtToken; //to see each user with verfied token details -

            return res.redirect("/");
        }

    } catch (error) {
        console.log("Error", error);
        return next();

    }
}


export default { checkAuthAtStaticLoginAndSignup, restrictToLoggedinUserOnly } 