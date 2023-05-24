//ARCHIVO EN JS DEFINIDO PARA ALMACENAR MÉTODOS REUTILIZABLES.

//VALIDAR QUE UN ELEMENTO ESTÉ VACÍO
function isEmpty(value) {
    if ($.type(value) === 'undefined')
        return true;
    if ($.type(value) === 'null')
        return true;
    if ($.type(value) === 'string' && value.length <= 0)
        return true;
    if ($.type(value) === 'array' && value.length === 0)
        return true;
    if ($.type(value) === 'number' && isNaN(parseInt(value)))
        return true;
    if ($.type(value) === 'object' && Object.keys(value).length === 0)
        return true;

    return false;
}


//Loaders
function loaderClose() {
    // eliminamos el div que bloquea pantalla
    $("#WindowLoad").remove();

}

function loaderShow(mensaje) {
    //eliminamos si existe un div ya bloqueando
    loaderClose();

    //si no enviamos mensaje se pondra este por defecto
    if (mensaje === undefined) mensaje = "Cargando...";

    //centrar imagen gif
    height = 20;//El div del titulo, para que se vea mas arriba (H)
    var ancho = 0;
    var alto = 0;

    //obtenemos el ancho y alto de la ventana de nuestro navegador, compatible con todos los navegadores
    if (window.innerWidth == undefined) ancho = window.screen.width;
    else ancho = window.innerWidth;
    if (window.innerHeight == undefined) alto = window.screen.height;
    else alto = window.innerHeight;

    //operación necesaria para centrar el div que muestra el mensaje
    var heightdivsito = alto / 2 - parseInt(height) / 2;//Se utiliza en el margen superior, para centrar

    //imagen que aparece mientras nuestro div es mostrado y da apariencia de cargando
    imgCentro = "<div style='text-align:center;height:" + alto + "px;'><div  style='color:#000;margin-top:" + heightdivsito + "px; font-size:20px;font-weight:normal'>" + mensaje + "</div><div class='spinner-border' role='status'></div></div>";

    //creamos el div que bloquea grande------------------------------------------
    div = document.createElement("div");
    div.id = "WindowLoad"
    div.style.width = ancho + "px";
    div.style.height = alto + "px";
    $("body").append(div);

    //creamos un input text para que el foco se plasme en este y el usuario no pueda escribir en nada de atras
    input = document.createElement("input");
    input.id = "focusInput";
    input.type = "text"

    //asignamos el div que bloquea
    $("#WindowLoad").append(input);

    //asignamos el foco y ocultamos el input text
    $("#focusInput").focus();
    $("#focusInput").hide();

    //centramos el div del texto
    $("#WindowLoad").html(imgCentro);
}


function isArray(value) {
    if (typeof (value) == undefined)
        return false;
    if (value == null)
        return false;

    if (value instanceof Array)
        return true;

    return false;
}


var select2 = {
    iniciar: function () {
        $(".select2").select2({
            width: '100%',
            theme: "bootstrap4"
        });
    },
    iniciarElemento: function (elemento) {
        $("#" + elemento).select2({
            width: '100%'
        });
    },
    asignarValor: function (id, valor) {
        $("#" + id).select2().select2("val", valor);
        $("#" + id).select2({ width: '100%' });
    },
    asignarValorTrigger: function (id, valor) {
        $("#" + id).select2().select2("val", valor);
        $("#" + id).select2({ width: '100%' });
        $("#" + id).trigger('change');
    },
    asignarValorQuitarBuscador: function (id, valor) {
        $("#" + id).select2().select2("val", valor);
        $("#" + id).select2({ width: '100%' });
        $('#' + id).select2({
            minimumResultsForSearch: -1
        });
    },
    readonly: function (id, valor) {
        $("#" + id).select2("readonly", valor);
    },

    cargar: function (id, data, val, text) {
        $("#" + id).empty();
        if (isArray(text)) {
            var sText;
            $.each(data, function (index, item) {
                sText = "";
                $.each(text, function (indexText, itemText) {
                    sText += (sText === "") ? item[itemText] : " | " + item[itemText];
                });
                $('#' + id).append('<option value="' + item[val] + '">' + sText + '</option>');
            });
        } else {
            $.each(data, function (index, item) {
                $('#' + id).append('<option value="' + item[val] + '">' + item[text] + '</option>');
            });
        }

    },
    cargarMayusculas: function (id, data, val, text) {
        $("#" + id).empty();
        if (isArray(text)) {
            var sText;
            $.each(data, function (index, item) {
                sText = "";
                $.each(text, function (indexText, itemText) {
                    sText += (sText === "") ? item[itemText] : " | " + item[text].toUpperCase();
                });
                $('#' + id).append('<option value="' + item[val] + '">' + sText + '</option>');
            });
        } else {
            $.each(data, function (index, item) {
                $('#' + id).append('<option value="' + item[val] + '">' + item[text].toUpperCase() + '</option>');
            });
        }

    },
    cargarDataSet: function (id, data, val, text, dataSet) {
        $("#" + id).empty();
        if (!isArray(text)) {
            text = [text];
        } else if (isEmpty(text)) {
            text = [];
        }

        if (!isArray(dataSet)) {
            dataSet = [dataSet];
        } else if (isEmpty(dataSet)) {
            dataSet = [];
        }

        var sText;
        var sDataSet;
        $.each(data, function (index, item) {
            sText = "";
            $.each(text, function (indexText, itemText) {
                sText += (sText === "") ? item[itemText] : " | " + item[itemText];
            });

            sDataSet = "";
            $.each(dataSet, function (indexDataSet, itemDataSet) {
                sDataSet += " data-" + itemDataSet + " = '" + item[itemDataSet] + "'";
            });

            $('#' + id).append('<option value="' + item[val] + '" ' + sDataSet + '>' + sText + '</option>');
        });
    },
    cargarDataSetSeleccione: function (id, data, val, text, dataSet, textSeleccione) {
        $("#" + id).empty();
        if (!isArray(text)) {
            text = [text];
        } else if (isEmpty(text)) {
            text = [];
        }

        if (!isArray(dataSet)) {
            dataSet = [dataSet];
        } else if (isEmpty(dataSet)) {
            dataSet = [];
        }

        var sText;
        var sDataSet;
        $('#' + id).append('<option value="">' + textSeleccione + '</option>');
        $.each(data, function (index, item) {
            sText = "";
            $.each(text, function (indexText, itemText) {
                sText += (sText === "") ? item[itemText] : " | " + item[itemText];
            });

            sDataSet = "";
            $.each(dataSet, function (indexDataSet, itemDataSet) {
                let datoSet = (!isEmpty(item[itemDataSet]) ? item[itemDataSet] : '');
                sDataSet += "  data-" + itemDataSet + " = '" + datoSet + "'";
            });

            $('#' + id).append('<option value="' + item[val] + '" ' + sDataSet + '>' + sText + '</option>');
        });
    },
    cargarSeleccione: function (id, data, val, text, textSeleccione) {//REV.
        $("#" + id).empty();
        $('#' + id).append('<option value="0">' + textSeleccione + '</option>');
        if (!isEmpty(data)) {
            if (isArray(text)) {
                var sText;
                $.each(data, function (index, item) {
                    sText = "";
                    $.each(text, function (indexText, itemText) {
                        sText += (sText === "") ? item[itemText] : " | " + item[itemText];
                    });
                    $('#' + id).append('<option value="' + item[val] + '">' + sText + '</option>');
                });
            } else {
                $.each(data, function (index, item) {
                    $('#' + id).append('<option value="' + item[val] + '">' + item[text] + '</option>');
                });
            }
        }
    },
    recargar: function (id, data, val, text) {
        this.limpiar(id);
        this.cargar(id, data, val, text);
    },
    limpiar: function (id) {
        $('#' + id).empty();
    },
    cargarAsignaUnico: function (id, data, val, text) {
        if (!isEmpty(data)) {
            this.cargar(id, data, val, text);
            if (data.length === 1) {
                this.asignarValor(id, data[0][val]);
            }
        }
    },
    obtenerValorDataSet: function (id, text) {
        var data = $("#" + id).select2('data');
        if (isEmpty(data))
            return null;
        return (data.element[0].dataset.hasOwnProperty(text)) ? data.element[0].dataset[text] : null;
    },
    obtenerValor: function (id) {
        var data = $("#" + id).select2('data');
        if (isEmpty(data))
            return null;
        return (data.hasOwnProperty("id")) ? data.id : null;
    },
    obtenerText: function (id) {
        var data = $("#" + id).select2('data');
        if (isEmpty(data))
            return null;
        return (data.hasOwnProperty("text")) ? data.text : null;
    },
    obtenerTextMultiple: function (id) {
        var cadena = "";
        var data = $("#" + id).select2('data');
        if (isEmpty(data)) {
            return null;
        }
        $.each(data, function (index, item) {

            if (!isEmpty(item.text)) {
                cadena += item.text + ", ";
            }

        });
        if (!isEmpty(cadena)) {
            return cadena.slice(0, -2);
        }
        return null;
        //return (data.hasOwnProperty("text")) ? data.text : null;
    },
    obtenerIdMultiple: function (id) {
        var data = $("#" + id).select2('data');
        var arrayIds = [];
        if (isEmpty(data)) {
            return null;
        }
        $.each(data, function (index, item) {
            if (!isEmpty(item.id)) {
                arrayIds.push(item.id);
            }
        });
        if (!isEmpty(arrayIds)) {
            return arrayIds;
        }
        return null;
    }
}

//SET FOCUS ON SEARCH - SELECT2
$(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
});

//FUNCION PARA ELIMINAR CARACTERES ESPECIALES NO PERMITIDOS EN ID'S
function formatearCadenaId(cadena) {

    var resultado = cadena.replace(/\s+/g, ''); //ESPACIOS EN BLANCO
    resultado = resultado.replace(/,/g, '_');   //COMAS
    resultado = resultado.replace(/\./g, '_');  //PUNTOS
    resultado = resultado.replace(/\//g, '_');  //BARRAS

    return resultado;
}

function decodeHtml(str) {

    let txt = document.createElement("textarea");

    txt.innerHTML = str;

    return txt.value;

}

function formatNumber(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function formatearFechaJS(fecha) {
    if (isEmpty(fecha))
        return '';

    var date = new Date(fecha);
    if ($.type(date) !== "date")
        return '';

    var nYear = date.getFullYear();
    var nMonth = date.getMonth() + 1;
    var nDay = date.getDate();
    //    var nHour = date.getHours();
    //    var nMinute = date.getMinutes();
    //    var nSecond = date.getSeconds();

    var year = nYear.toString();
    var month = (nMonth < 10 ? '0' : '') + nMonth.toString();
    var day = (nDay < 10 ? '0' : '') + nDay.toString();
    //    var hour = (nHour < 10 ? '0' : '') + nHour.toString();
    //    var minute = (nMinute < 10 ? '0' : '') + nMinute.toString();
    //    var second = (nSecond < 10 ? '0' : '') + nSecond.toString();

    //    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return year + '-' + month + '-' + day;
}

// Quick and simple export target #table_id into a csv
function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv_string));
    //link.setAttribute('href', 'data:text/csv;charset=base64,' + btoa(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}