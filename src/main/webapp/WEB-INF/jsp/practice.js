 $('#newPassword').on('change',function(e){
     alert('about to validate');
	 $('#changePreferences').validate(
             {
                 rules : {
             
                     newPassword : {
                         minlength : 8,
                         capitals : true
                     },
                     confirmPassword : {
                         
                         equalTo : "#newPassword",
                     },
                   
               
                 },
                 messages : {
                     newPassword : {
                         minlength : "Password too short, make it at least 8 characters",
                         capitals : "Field must contain a capital letter",
                     },
                     confirmPassword : {
                         equalTo : "Passwords do not match",
                     },
                    
                 },
                 errorClass : "error"
				});
 });