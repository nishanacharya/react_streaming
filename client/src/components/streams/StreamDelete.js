import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?"
        } else {
            return `Are you sure you want to delete the stream: ${this.props.stream.title}?`
        }
    }

    render() {
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
}

const mapStateTopProps = (state, ownProps) => {
    return { stream : state.streams[ownProps.match.params.id] };     
}

export default connect(mapStateTopProps, {fetchStream, deleteStream})(StreamDelete);