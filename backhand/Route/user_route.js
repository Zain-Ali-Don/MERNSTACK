let exp = require("express")
let r = exp.Router()
let user_logic = require("../controller/user_logic")

r.post("/user", user_logic.register);
r.get("/getuser",user_logic.get_all_user);
r.delete("/getuser/:id",user_logic.delete_user);
r.put("/getuser/:id",user_logic.update_record);
r.post("/log",user_logic.user_login);


module.exports= r;