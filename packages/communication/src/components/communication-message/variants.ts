import SystemMessage from './system-message/SystemMessage';
import DateMessage from './date-message/DateMessage';
import PluginMessage from './plugin-message/PluginMessage';
import TextMessage from './text-message/TextMessage';
import AgreeMessage from './agree-message/AgreeMessage';

interface CommunicationMessageNameSpace {
    System: typeof SystemMessage;
    Date: typeof DateMessage;
    Plugin: typeof PluginMessage;
    Text: typeof TextMessage;
    Agree: typeof AgreeMessage;
}

const CommunicationMessage: CommunicationMessageNameSpace = {
    System: SystemMessage,
    Date: DateMessage,
    Plugin: PluginMessage,
    Text: TextMessage,
    Agree: AgreeMessage,
};

export default CommunicationMessage;
