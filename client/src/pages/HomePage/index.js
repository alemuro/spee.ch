import { connect } from 'react-redux';
import { onHandleShowPageUri } from '../../actions/show';
import View from './view';

const mapStateToProps = ({ show, site, channel, publish }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
    homeChannel: site.publishOnlyApproved && !channel.loggedInChannel.name ? `${site.approvedChannels[0].name}:${site.approvedChannels[0].longId}` : null,
    isUpdate   : publish.isUpdate,
  };
};

const mapDispatchToProps = {
  onHandleShowPageUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
