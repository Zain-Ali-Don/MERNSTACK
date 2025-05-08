let user = require("../collection/User");
let b = require("bcrypt");
let jwt = require("jsonwebtoken");
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
  }
  
};

module.exports = user_function;
