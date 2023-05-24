//RUTA GLOBAL
var sPath;
var complejoTable;

function docStart(ruta) {

    //Obtenemos la ruta global
    sPath = ruta;

    select2.iniciar();

    complejoTable = $('#complejoTable').DataTable({
        "scrollX": true,
        "autowidth": true,
        "order": [0, "asc"],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ning\xfAn dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "columns": [
            { "data": "complejo_id" },
            { "data": "nombre" },
            { "data": "sede" },
            { "data": "localizacion" },
            { "data": "jefe" },
            { "data": "area_total" },
            {
                "data": "complejo_id",
                "render": function (data, type, row) {

                    return '<a onclick="verModalComplejo(\'' + data + '\');" title="Editar complejo" style="cursor: pointer; ">' +
                        '<i class="fas fa-edit" style="color:#DEB801;"></i></a>&nbsp;<a onclick="eliminarComplejo(\'' + data + '\');" ' +
                        'title="Eliminar complejo" style="cursor: pointer; "><i class="fas fa-trash" style="color:#DC3545;"></i></a>';

                }
            },
        ],
        "columnDefs": [
            {
                "targets": [0, 3, 5, 6],
                className: 'text-center'
            }
        ],
        "destroy": true
    });

    //Inicializamos los combos
    data = {
        "SedeId": 0
    }

    $.ajax({
        type: "POST",
        url: sPath + "Sede/Listar",
        dataType: "json",
        data: data,
        async: true,
        success: function (resultado) {
            select2.cargarSeleccione('cboSede', resultado, 'sede_id', 'nombre', 'Seleccione una sede');
        }
    });

    $.ajax({
        type: "POST",
        url: sPath + "Complejo/ListarJefes",
        dataType: "json",
        data: data,
        async: true,
        success: function (resultado) {
            select2.cargarSeleccione('cboJefe', resultado, 'jefe_id', 'nombre', 'Seleccione un jefe');
        }
    });
}

function loadComplejos() {

    data = {
        "ComplejoId": 0
    }

    $.ajax({
        type: "POST",
        url: sPath + "Complejo/Listar",
        dataType: "json",
        data: data,
        async: true,
        success: function (resultado) {
            visualizarComplejos(resultado);
        }
    });
}

function visualizarComplejos(data) {

    complejoTable.clear().draw();
    complejoTable.rows.add(data).draw();
    complejoTable.columns.adjust().draw();

}

function verModalComplejo(ComplejoId) {

    $("#txtTitulo").empty();

    $("#txtComplejoId").val('');
    $("#txtComplejoId").val(ComplejoId);

    $("#txtNombre").val('');
    $("#cboSede").val('0');
    $("#txtLocalizacion").val('');
    $("#cboJefe").val('0');
    $("#txtArea").val('');

    if (!isEmpty(ComplejoId)) {

        $("#txtTitulo").text("EDITAR COMPLEJO");

        data = {
            "ComplejoId": ComplejoId
        }

        $.ajax({
            type: "POST",
            url: sPath + "Complejo/Listar",
            dataType: "json",
            data: data,
            success: function (data) {

                if (!isEmpty(data)) {

                    $("#txtNombre").val(data[0].nombre);
                    $("#cboSede").val(data[0].sede_id);
                    $("#txtLocalizacion").val(data[0].localizacion);
                    $("#cboJefe").val(data[0].jefe_id);
                    $("#txtArea").val(data[0].area_total);

                } else {
                    $(document).Toasts('create', {
                        class: 'bg-warning',
                        title: "Error al obtener la data.",
                        body: "No se pudo obtener la información del complejo seleccionado. ",
                        autohide: true,
                        delay: 3000,
                        fade: true
                    });
                }
            }
        });

    } else {
        $("#txtTitulo").text("REGISTRAR NUEVO COMPLEJO");
    }

    $("#modalFormComplejo").modal("show");
}


function guardarComplejo() {

    var complejoId = $("#txtComplejoId").val();
    var nombre =  $("#txtNombre").val();
    var sede = $("#cboSede").val();
    var localizacion = $("#txtLocalizacion").val();
    var jefe = $("#cboJefe").val();
    var area = $("#txtArea").val();

    //Validamos que al menos el nombre sea ingresado.
    if (!isEmpty(nombre) && sede != 0 && jefe != 0) {
        var data = {
            "ComplejoId": complejoId,
            "Nombre": nombre,
            "Sede": sede,
            "Localizacion": localizacion,
            "Jefe": jefe,
            "Area": area
        };

        $.ajax({
            type: "POST",
            url: sPath + "Complejo/SaveComplejo",
            dataType: "json",
            data: data,
            success: function (resultado) {

                if (resultado == "ok") {

                    $(document).Toasts('create', {
                        class: 'bg-success',
                        title: "Registro de complejos",
                        body: "Se guardo correctamente los datos del complejo. ",
                        autohide: true,
                        delay: 3000,
                        fade: true
                    });

                    $("#modalFormComplejo").modal("hide");
                    loadComplejos();

                } else {
                    $(document).Toasts('create', {
                        class: 'bg-warning',
                        title: "Error al guardar el complejo.",
                        body: "Ocurrió un error al intentar guardar el registro. ",
                        autohide: true,
                        delay: 3000,
                        fade: true
                    });
                }
            }
        });
    } else {
        $(document).Toasts('create', {
            class: 'bg-warning',
            title: "Validacion. ",
            body: "Debe ingresar los datos completos. ",
            autohide: true,
            delay: 3000,
            fade: true
        });
    }
}

function eliminarComplejo(ComplejoId) {

    Swal.fire({
        title: 'Esta seguro de eliminar este registro?',
        text: "No se podra revertir el cambio.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {

            var data = {
                "ComplejoId": ComplejoId
            };
            $.ajax({
                type: "POST",
                url: sPath + "Complejo/DeleteComplejo",
                dataType: "json",
                data: data,
                async: true,
                success: function (resultado) {

                    if (resultado == "ok") {
                        $(document).Toasts('create', {
                            class: 'bg-success',
                            title: "Actualización",
                            body: "Eliminación realizada correctamente. ",
                            autohide: true,
                            delay: 3000,
                            fade: true
                        });

                        loadComplejos();
                    }
                }
            });

        }
    });
}