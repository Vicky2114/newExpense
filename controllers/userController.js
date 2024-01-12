const userModel = require('../models/userModel');
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User Not found');
        }
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};
const registerController = async(req,res) => {
try{
      const newUser = new userModel(req.body)
      await newUser.save();
      res.status(201).json({
        success:true,
        newUser,
      })
}catch(error){
    res.status(400).json({
        success:false,
        error,
    });
}
};

const updateProfile = async (req, res) => {
    try {
      const { userId, updatedProfile } = req.body;
  
      // Find the user by ID and update the profile
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedProfile, { new: true });
  
      res.status(201).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { loginController, registerController, updateProfile};


  

  


