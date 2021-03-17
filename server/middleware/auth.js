import jwt from 'jsonwebtoken';

// e.g. User wants to like a post
// clicks the like button => auth middleware (NEXT) {verifying if user is allowed to like the post} => like controller...


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            // jwt.verify(TOKEN, JWT_SECRET)
            decodedData = jwt.verify(token, "test");

            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData.sub;
        }

        next(); // do something next
    } catch (error) {
        console.log(error);
    }
};

export default auth;