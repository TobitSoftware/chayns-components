import React from 'react';
import classNames from 'classnames';

/**
 * ############################
 * # HARRY, YOU ARE A WIZARD! #
 * ############################
 */
export default class SetupWizard extends React.Component{

    static defaultProps = {
        ready: ()=>{}
    };

    static childContextTypes = {
        nextStep: React.PropTypes.func,
        previousStep: React.PropTypes.func,
        toStep: React.PropTypes.func
    };

    static propTypes = {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.element),
            React.PropTypes.element
        ]),
        ready: React.PropTypes.func
    };

    constructor(){
        super();
        this.state = {
            currentStep: 0,
            maxProgress: 0
        };
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.toStep = this.toStep.bind(this);
        this.ready = this.ready.bind(this);
    }

    getChildContext(){
        return {
            nextStep: this.nextStep,
            previousStep: this.previousStep,
            toStep: this.toStep
        }
    }

    nextStep(){
        if(this.props.children instanceof Array && this.props.children.length-1 > this.state.currentStep) {
            this.updateContent(this.state.currentStep + 1)
        }else{
            this.ready();
        }
    }

    previousStep(){
        if(this.state.currentStep != 0) {
            this.updateContent(this.state.currentStep - 1);
        }
    }

    toStep(step){
        if(this.props.children instanceof Array ){
            if( (this.props.children.length-1) >= step ){
                this.updateContent(step);
            }else if( (this.props.children.length-1) === step+1){
                this.ready();
            }
        }
    }

    ready(){
        this.props.ready();
    }

    updateContent(step){
        this.content.className = 'sw__content_old animated';
        window.setTimeout(()=>{
            let maxProgress = step>this.state.maxProgress ? step : this.state.maxProgress;
            this.setState({
                currentStep: step,
                maxProgress: maxProgress
            });
            this.content.className = 'sw__content animated';
        },200);
    }

    renderHead(){
        if(this.props.children instanceof Array){
            return this.props.children.map((children,index)=>{

                let clickable = this.state.currentStep != index && (index < this.state.maxProgress || this.state.maxProgress === index);

                let className = classNames({
                        "sw__head_item_focus": this.state.currentStep === index,
                        "sw__head_item_clickable": clickable,
                        "sw__head_item": this.state.currentStep != index
                    });

                return(
                    <span className={className} key={index} onClick={clickable ? ()=>this.toStep(index) : ()=>{}}>
                        {index+1} {children.props.title ? children.props.title : ''}
                    </span>
                )
            })
        }else{
            return '';
        }
    }

    render(){
        let children = '';

        if(this.props.children){
            if(this.props.children instanceof Array){
                children = this.props.children[this.state.currentStep];
            }else{
                children = this.props.children;
            }
        }

        return(
            <div className="sw__top">
                <div className="sw__head chayns__color--100" hidden={ !(this.props.children instanceof Array) }>
                    {this.renderHead()}
                </div>
                <div ref={(content)=>this.content=content} className="sw__content animated">
                    {children}
                </div>
            </div>
        );
    }
}