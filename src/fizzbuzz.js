for(i = 1; i <= 100; i++){
         
    let  out = "";

    if(i % 3 === 0)
        out += "fizz";

    if(i % 5 === 0)
        out += "buzz";

    if(i % 7 === 0)
        out += "bazz"   
    
        console.log(out || i);
}