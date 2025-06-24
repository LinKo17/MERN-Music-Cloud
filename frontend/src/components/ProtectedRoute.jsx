import { Navigate } from "react-router-dom";
function ProtectedRoute({token,children}){   
    console.log(token);

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