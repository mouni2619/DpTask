let nums = [3,3]
let target = 6
let array=[]
for(let i=0;i<nums.length;i++){
    for(let j=i+1;j<nums.length;j++){
        if(nums[i]+nums[j]===target){
            array.push(i,j)
        }
           
    }
    
}
console.log(array);