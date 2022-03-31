const LdsAlert = (props) => {
  return (
    <div className="slds-notify_container slds-is-relative">
      <div
        className="slds-notify slds-notify_toast slds-theme_success"
        role="status"
      >
        <span className="slds-assistive-text">success</span>
        <span
          className="slds-icon_container slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top"
          title="Description of icon when needed"
        >
          <svg className="slds-icon slds-icon_small" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>
          </svg>
        </span>
        <div className="slds-notify__content">
          <h2 className="slds-text-heading_small ">crée</h2>
        </div>
        <div className="slds-notify__close">
          <button
            className="slds-button slds-button_icon slds-button_icon-inverse"
            title="Close"
          >
            <svg
              className="slds-button__icon slds-button__icon_large"
              aria-hidden="true"
            >
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
            </svg>
            <span className="slds-assistive-text">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LdsAlert;
