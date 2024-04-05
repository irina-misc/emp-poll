
import {connect} from "react-redux";

const Error = () => {
    return (
        <div className = "center">
            <h3 className = "text-center" style={{ color: "red"}}>Page not found - Error 404</h3>
        </div>
    );
};

const mapStateToProps = ({authedUser}) => ({authedUser: authedUser});

export default connect(mapStateToProps)(Error);

