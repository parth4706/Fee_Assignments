// function sum(a,b){
//     console.log("hii")
//     return a + b
// }
// console.log(sum(2,3))
// a = [1,2,3,4,5,6,7,8,9,10]
// b = [[1,2,3],[4,5,6],[7,8,9]]
// for(let i = 0; i < a.length; i++){
//     console.log(a[i])
// }
function sendemail(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("email sent")
        },2000)
    })
}
function placeorder(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("order placed")
        },2000)
    })
}
function processpayment(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("payment processed")
        },2000) 
    })
}
async function runFlow(){
    try{
        const orderResult = await placeorder();
        console.log(orderResult);

        const paymentResult = await processpayment();
        console.log(paymentResult);

        const emailResult = await sendemail();
        console.log(emailResult);
    } catch(err){
        console.error(err);
    }
}

runFlow();
