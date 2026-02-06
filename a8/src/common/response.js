
export function response(res,code,msg){
    return res.status(code).json({status : 'operation succeded', ...msg});
}