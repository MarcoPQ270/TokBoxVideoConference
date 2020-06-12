// reemplazamod estos valores con los generados en tu cuenta TokBox
var apiKey = "46667552";
var sessionId = "1_MX40NjY2NzU1Mn5-MTU5MTcxNDIzNTY4N34wenFLcVlHWXBPQ3kzR0FkR0pnWWZ0OXR-fg";
// El token se genera como editor
var token = "T1==cGFydG5lcl9pZD00NjY2NzU1MiZzaWc9OGMyNjAyZTUwODYwN2JhNDQyOGUyYjgxZjZmN2Y2YWIzMGQ3MDAzYTpzZXNzaW9uX2lkPTFfTVg0ME5qWTJOelUxTW41LU1UVTVNVGN4TkRJek5UWTROMzR3ZW5GTGNWbEhXWEJQUTNrelIwRmtSMHBuV1daME9YUi1mZyZjcmVhdGVfdGltZT0xNTkxNzE0OTA5Jm5vbmNlPTAuMjA5MTIyMzY0NzIwMjMzNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTkxNzM2NTA2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (opcional) agregue el código del servidor aquí
initializeSession();


// Manejando todos nuestros errores aquí alertándolos
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    // Suscríbete a una secuencia recién creada
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

    // Crear un edito
    var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Conéctate a la sesión
    session.connect(token, function(error) {

        // Si la conexión es exitosa, publíquela en la sesión
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}