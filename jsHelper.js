/*
 >  Meisam Farahani
 >  Full-stack .NET Developer
 >  https://meisamfarahani.ir
 */
 
 var jsHelper = {
 
   replaceAllString : function(string, Find, Replace) {
    try {
        return string.replace(new RegExp(Find, "gi"), Replace);
    } catch (ex) { return string; }
  };
 
 };
