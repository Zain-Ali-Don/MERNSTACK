let user = require("../collection/User");
let b = require("bcrypt");
let jwt = require("jsonwebtoken");
let node = require("nodemailer")
require("dotenv").config();

let Email_Info = node.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS_KEY
  }
})

let user_function = {
  register: async function (req, res) {
    try {
      let { name, email, password, gender, age } = req.body;
      let email_check = await user.findOne({ email: email });

      if (email_check) {
        res.status(409).json({ msg: "Email Already Exist" });
      } else {
        let enc_pswd = b.hashSync(password, 15);
        let user_data = new user({
          name,
          email,
          password: enc_pswd,
          gender,
          age
        });

        let save_data = await user_data.save();

       
        res.status(200).json({ msg: "User registered successfully" });
        let email_data = {
          to: email,
          from: process.env.EMAIL,
          subject: "Account Registered Successfully",
          html: `<h3>Hello ${name}</h3> 
                 <p>Your Account has been successfully registered, now you can login and start with us. 
                 <a href='http://localhost:3000/log'>Click Here to Continue on Site</a></p>`
        };
        
        Email_Info.sendMail(email_data, function(e, i) {
          if (e) {
            console.log(e.message);
          } else {
            console.log("Email Sent Successfully" + i);
          }
        });        
      }
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  },
  get_all_user : async function(req,res){
    try {
      let user_record = await user.find().select("-password").sort({"record_at":-1});
      return res.status(200).json(user_record)
    } catch (error) {
     res.status(501).json({msg:error.message});
    }
  },
  delete_user :async function(req,res){
    try {
      let { id } = req.params
      let find_id = await user.findById(id)
      if (find_id) {
        await user.findByIdAndDelete(find_id)
        res.status(200).json({ msg: "user Deleted successfully"});
      }
    } catch (error) {
       res.status(501).json({msg:error.message});
    }
  },
  update_record: async function (req, res) {
    try {
      let { id } = req.params;
      let { name, age, email, gender } = req.body;
  
      let id_exist = await user.findById(id);
      if (!id_exist) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      let updaterecord = { name, email, age, gender };
  
      await user.findByIdAndUpdate(id, updaterecord);
      return res.status(200).json({ msg: "User Updated Successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  user_login:async function(req,res){
    try {
      let { email, password } = req.body;
      let email_exist = await user.findOne({ email });

      if (!email_exist) {
        return res.status(404).json({ msg: "Email not found" });
      }
      let password_find =  b.compareSync(password, email_exist.password);
      if (!password_find) {
        return res.status(404).json({msg: "Password is Invalid"});
      }

      let secure_data = jwt.sign({id:email_exist.id}, "secretkey", { expiresIn: "2h" });
      res.status(201).json({secure_data,user:{name:email_exist.name , email:email_exist.email}});
    } catch (error) {
      res.status(501).json({msg:error.message});
    }
  },
  forgotPassword: async function (req, res) {
    try {
        let { email } = req.body;
        let email_check = await user.findOne({ email });

        if (!email_check) {
            return res.status(404).json({ msg: "Email is Invalid / User Not Found" });
        }

        let token = jwt.sign({ id: email_check.id }, "hunain123", { expiresIn: "1h" });
        let link = "http://localhost:3000/reset/" + token;

        let email_body = {
            to: email,
            from: process.env.EMAIL,
            subject: "Reset Password",
            html: `<h3>Hi ${email_check.name}</h3> <p>Hope You're doing well, Here is your reset Password link, 
            Please click on the given link to reset your password</p> ${link}`
        };

        Email_Info.sendMail(email_body, function (er, i) {
            if (er) {
                console.log(er.message);
            } else {
                console.log("Email Sent Successfully" + i);
            }
        });

        res.status(201).json({ msg: "Password Reset Link Has been Sent" });

    } catch (error) {
        res.status(501).json({ msg: error.message });
    }
}

  
};

module.exports = user_function;
