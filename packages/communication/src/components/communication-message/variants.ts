import SystemMessage from './system-message/SystemMessage';
import DateMessage from './date-message/DateMessage';
import PluginMessage from './plugin-message/PluginMessage';
import TextMessage from './text-message/TextMessage';
import AgreeMessage from './agree-message/AgreeMessage';
import PreviewMessage from './preview-message/PreviewMessage';

interface CommunicationMessageNameSpace {
    System: typeof SystemMessage;
    Date: typeof DateMessage;
    Plugin: typeof PluginMessage;
    Text: typeof TextMessage;
    Agree: typeof AgreeMessage;
    Preview: typeof PreviewMessage;
}

const CommunicationMessage: CommunicationMessageNameSpace = {
    System: SystemMessage,
    Date: DateMessage,
    Plugin: PluginMessage,
    Text: TextMessage,
    Agree: AgreeMessage,
    Preview: PreviewMessage,
};

export default CommunicationMessage;
