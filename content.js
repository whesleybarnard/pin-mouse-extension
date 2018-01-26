(function () {
    $(document).ready(function () {
        console.log('loading pin-mouse...');

        var mainContainer = $('.mainContainer');

        mainContainer.on('mouseover', '.Pin.PinRep', function (event) {
            var _this = $(this);
            var _wrapper = _this.find('.pinWrapper');
            var _pinMouseBlock = _wrapper.find('.pin-mouse-block');

            if (_pinMouseBlock.length > 0) {
                //It does contain
            } else {
                //Does not contain
                _wrapper.append('<div class="pin-mouse-block"><button class="pin-mouse-button">Schedule!!</button></div>');
            }
        });

        mainContainer.on('click', '.pin-mouse-button', function (event) {
            var currentPinWrapper = $(event.target).parent().parent();
            var anchor_with_pin_id = currentPinWrapper.find('a[href^="/pin/"]');

            var fullLinkUrl = anchor_with_pin_id.attr('href');
            var pinId = extractPinId(fullLinkUrl);

            $.post("https://localhost:3333/scheduled_pins/save_pin_id", {
                pin_uuid: pinId
            });
        });

        var regExp = /\/pin\/(.*?)\//;

        function extractPinId(s) {
            var matches = regExp.exec(s);
            var pinId = matches[1];

            return pinId;
        }
    });
})();