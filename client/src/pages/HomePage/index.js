import { connect } from 'react-redux';
import { onHandleShowPageUri } from '../../actions/show';
import View from './view';

<<<<<<< HEAD
const mapStateToProps = ({ show, site, channel }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
    homeChannel: site.publishOnlyApproved && !channel.loggedInChannel.name ? `${site.approvedChannels[0].name}:${site.approvedChannels[0].longId}` : null,
  };
};
=======
const mapStateToProps = props => ({ isUpdate: props.publish.isUpdate });
>>>>>>> clear publish and edit pages based on publish.isUpdate

const mapDispatchToProps = {
  onHandleShowPageUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
