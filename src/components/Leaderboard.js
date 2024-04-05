import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const Leaderboard = (props) => {

    return (
        <div>
            <h3 >Leader Board</h3>
            <table className="table">
                <thead className="head-light" >
                    <tr>
                        <th scope="col">Users</th>
                        <th scope="col">Answered questions</th>
                        <th scope="col">Asked questions</th>
                    </tr>
                </thead>

                <tbody>
                    {props.user_ids.map((id, idx) =>
                        <tr>
                            <td >
                                <img width="30" height="30" src={require('../images/' + props.users[id].id + '.ico')} alt={'Avatar of ${props.users[id].id}'} />
                                <span style={{ paddingLeft: 10 }}> {props.users[id].name}</span></td>
                            <td>{Object.keys(props.users[id].answers).length}</td>
                            <td>{props.users[id].questions.length}</td>
                        </tr>
                    )}
                </tbody></table>
        </div>
    );
};

const mapStateToProps = ({ users }) => {

	const users_ids = Object.keys(users).sort( function (a, b) {
		return Object.keys(users[b].answers).length - Object.keys(users[a].answers).length ||
		Object.keys(users[b].questions).length - Object.keys(users[a].questions).length
	});	
    return {
        user_ids: users_ids,
        users: users
    };	
};

export default connect(mapStateToProps)(Leaderboard);