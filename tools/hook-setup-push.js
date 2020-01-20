var fs = require('fs');
fs.writeFile(".git/hooks/pre-push", "#!/bin/sh \n \
\
yarn test:coverage \n \
\
  RESULT=$? \n \
   if [ $RESULT -ne 0 ]; then \n \
        echo 'test failed' \n \
        exit 1 \n \
   fi \n \
\
yarn lint \n \
\
  RESULT=$? \n \
   if [ $RESULT -ne 0 ]; then \n \
        echo 'lint check failed' \n \
        exit 1 \n \
   fi \n \
\
exit 0", function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log("Hook installed");
});
