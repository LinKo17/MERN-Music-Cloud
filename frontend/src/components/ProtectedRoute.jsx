import { Navigate } from "react-router-dom";
function ProtectedRoute({token,children}){   
    console.log(token);

    /*
        I don't use that now. Waiting.
        In Future, I will fix this.

    */
    return (
        <>
            {
                token ?
                    children
                :
                <Navigate to="/login"/>
            }
            
        </>
    )
}
export default ProtectedRoute