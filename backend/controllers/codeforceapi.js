import axios from "axios";
export const codeforcescontest=async(req,res)=>{
    try{
        var response=await axios.get("https://codeforces.com/api/contest.list");
        response=response.data;
        console.log(response);
        if(response.status==="OK"){
            const upcomingcontest=response.result.filter(contest=>contest.phase==="BEFORE");
            const finishedcontest=response.result.filter(contest=>contest.phase==="FINISHED");
            res.json({success:true,cfcontests:upcomingcontest});
        }
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}

// export const leetcodecontest=async()=>{
//     try{
//         const response=await axios.get('');
//     }
//     catch(error){
//         res.json({success:true,message:error.message});
//     }
// }