//RUTA GLOBAL
var sPath;
var sedeTable;

function docStart(ruta) {

    //Obtenemos la ruta global
    sPath = ruta;

    sedeTable = $('#sedeTable').DataTable({
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
            { "data": "sede_id" },
            { "data": "nombre" },
            { "data": "ubicacion" },
            { "data": "nro_complejos" },
            {
                "data": "presupuesto",
                "render": function (data, type, row) {
                    return "S/" +  data;
                }
            },
            {
                "data": "sede_id",
                "render": function (data, type, row) {

                    return '<a onclick="verModalSede(\'' + data + '\');" title="Editar sede" style="cursor: pointer; ">' +
                        '<i class="fas fa-edit" style="color:#DEB801;"></i></a>&nbsp;<a onclick="eliminarSede(\'' + data + '\');" ' +
                        'title="Eliminar sede" style="cursor: pointer; "><i class="fas fa-trash" style="color:#DC3545;"></i></a>';
                        
                }
            },
        ],
        "columnDefs": [
            {
                "targets": [0, 3, 4, 5],
                className: 'text-center'
            }
        ],
        "destroy": true
    });
}

function loadSedes() {

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
            visualizarSedes(resultado);
        }
    });
}

function visualizarSedes(data) {

    sedeTable.clear().draw();
    sedeTable.rows.add(data).draw();
    sedeTable.columns.adjust().draw();

}

function verModalSede(SedeId) {

    $("#txtTitulo").empty();

    $("#txtSedeId").val('');
    $("#txtSedeId").val(SedeId);

    $("#txtNombre").val('');
    $("#txtUbicacion").val('');
    $("#txtComplejos").val('');
    $("#txtPresupuesto").val('');

    if (!isEmpty(SedeId)) {

        $("#txtTitulo").text("EDITAR SEDE");

        data = {
            "SedeId": SedeId
        }

        $.ajax({
            type: "POST",
            url: sPath + "Sede/Listar",
            dataType: "json",
            data: data,
            success: function (data) {

                if (!isEmpty(data)) {

                    $("#modalFormSede").modal("show");
                    $("#txtNombre").val(data[0].nombre);
                    $("#txtUbicacion").val(data[0].ubicacion);
                    $("#txtComplejos").val(data[0].nro_complejos);
                    $("#txtPresupuesto").val(data[0].presupuesto);

                } else {
                    $(document).Toasts('create', {
                        class: 'bg-warning',
                        title: "Error al obtener la data.",
                        body: "No se pudo obtener la información de la sede seleccionada. ",
                        autohide: true,
                        delay: 3000,
                        fade: true
                    });
                }
            }
        });

    } else {
        $("#txtTitulo").text("REGISTRAR NUEVA SEDE");
    }

    $("#modalFormSede").modal("show");
}

function guardarSede() {

    var sedeId = $("#txtSedeId").val();
    var nombre = $("#txtNombre").val();
    var ubicacion = $("#txtUbicacion").val();
    var complejos = $("#txtComplejos").val();
    var presupuesto = $("#txtPresupuesto").val();

    //Validamos que al menos el nombre sea ingresado.
    if (!isEmpty(nombre)) {
        var data = {
            "SedeId": sedeId,
            "Nombre": nombre,
            "Ubicacion": ubicacion,
            "Complejos": complejos,
            "Presupuesto": presupuesto
        };

        $.ajax({
            type: "POST",
            url: sPath + "Sede/SaveSede",
            dataType: "json",
            data: data,
            success: function (resultado) {

                if (resultado == "ok") {

                    $(document).Toasts('create', {
                        class: 'bg-success',
                        title: "Registro de equipos",
                        body: "Se guardó correctamente los datos de la sede. ",
                        autohide: true,
                        delay: 3000,
                        fade: true
                    });

                    $("#modalFormSede").modal("hide");
                    loadSedes();

                } else {
                    $(document).Toasts('create', {
                        class: 'bg-warning',
                        title: "Error al guardar el equipo.",
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
            title: "Validación.",
            body: "Debe ingresar un nombre para el equipo. ",
            autohide: true,
            delay: 3000,
            fade: true
        });
    }
}

function eliminarSede(SedeId) {

    Swal.fire({
        title: '¿Está seguro de eliminar este registro?',
        text: "No se podrá revertir el cambio.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {

            var data = {
                "SedeId": SedeId
            };
            $.ajax({
                type: "POST",
                url: sPath + "Sede/DeleteSede",
                dataType: "json",
                data: data,
                async: true,
                success: function (resultado) {

                    if (resultado == "ok") {
                        $(document).Toasts('create', {
                            class: 'bg-success',
                            title: "Actualización",
                            body: "Eliminación realizada correctamente ",
                            autohide: true,
                            delay: 3000,
                            fade: true
                        });

                        loadSedes();
                    }
                }
            });

        }
    });
}

