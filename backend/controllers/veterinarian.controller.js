import VeterinarianModel from "../models/Veterinarian.js";
import generateJWT from "../helpers/createJwt.js";
import createId from "../helpers/createId.js";

const createUser =  async (req, res) => {
    const { email } = req.body;

    const existUser = await VeterinarianModel.findOne({email});

    if(existUser) {
        const error = new Error("A user already use this email.");

        return res.json(error.message);
    }

    try {
        const veterinarian = new VeterinarianModel(req.body);
        const newVeterinarian = await veterinarian.save()

        res.json(newVeterinarian);
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const existUser = await VeterinarianModel.findOne({email});

    // CHECKING FOR USER WITH PROVIDED EMAIL
    if(!existUser) {
        const error = new Error("The user does not exist.");
        return res.status(403).json({message: error.message});
    }

    // CHECKING IS USER HAVE BEEN CONFIRMED
    if(!existUser.isConfirm){
        const error = new Error("This user need confirmation.");
        return res.status(401).json({message: error.message});
    }

    // CHECKING FOR INCORRECT PASSWORD
    console.log('checking password: ', existUser.CheckPassword);
    if(existUser.CheckPassword) {
        // VALIDATE WITH JWT
        console.log({ token: generateJWT(existUser.id) });
    } else {
        const error = new Error("The password is incorrect.");
        return res.status(401).json({ message: error.message });
    }

    try {
        return res.status(200).json({ message: "You can login.", token: generateJWT(existUser.id) });
    } catch (error) {
        console.log("ERROR WHILE LOGIN: ", error);
        return res.status(500).send({message: error});
    }

    res.json({
        message: "You must login to have access"
    });
};

const confirming = async (req, res) => {
    const { token } = req.params;

    const findToken = await VeterinarianModel.findOne({token});
    console.log(findToken);
    if(!findToken){
        const error = new Error('The user has no token o does not exist.');
        return res.status(404).json({message: error.message});
    }
    
    try {
        findToken.isConfirm = true;
        findToken.token = null;
        await findToken.save();
        return res.status(200).json({message: 'Confirmed account.'})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const profile = (req, res) => {
    const { veterinarian } = req;
    res.status(200).json({ profile: veterinarian });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const veterinarian = await VeterinarianModel.findOne({ email });

    if(!veterinarian) {
        const error = new Error('There is no veterinarian with such email.');
        res.status(404).json({ message: error.message });
    }

    try {
        veterinarian.token = createId();
        await veterinarian.save();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const checkToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await VeterinarianModel.findOne({ token });

    if(validToken) {
        console.log('Valid token, the user exist');
    } else{
        const error = new Error("There's no user with such token");
        return res.status(404).json({ message: error.message });
    }
};

const newPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const veterinarian = await VeterinarianModel.findOne({ token });

    if(!veterinarian) {
        const error = new Error("The veterinarian doesn't exist");
        return res.status(404).json({ message: error.message });
    }

    try {
        veterinarian.token = null;
        veterinarian.password = password;
        await veterinarian.save();
        return res.status(200).json({ message: "Password successfully saved." });
    } catch (error) {
        return res.status(403).json({ message: error });
    }
};

export { 
         createUser,
         login,
         confirming,
         profile,
         forgotPassword,
         checkToken,
         newPassword
        };