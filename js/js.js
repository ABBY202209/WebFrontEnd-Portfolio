$(function () {
    // 綁定
    // const myBtn = $('#myBtn');
    const tbody = $('tbody');
    


    //ajax
    $.ajax({
        url: "	https://www.tsa.gov.tw/api/publicDataArea/GetFormaterData?id=42879f51-f47f-4d26-8b2b-5535c652cbde",
        type: "get",
        dataType: 'json',
        success: function (res) {
            console.log('res', res);

                            
            
            
            let contentText = "";
            //抓key value
            $.each(res, function (key, value) {
                if (key < 5) {
                console.log(value);
                console.log(value.GoalAirportName);
                console.log(value.ExpectDepartureTime);
                console.log(value.UpdateTime);
                let edt =value.ExpectDepartureTime.substring(0,2)+":"+value.ExpectDepartureTime.substring(2,4);
                let rdt =value.RealDepartureTime.substring(0,2)+":"+value.RealDepartureTime.substring(2,4);
                let updata =value.UpdateTime.substring(11, 16);
                contentText += `
                    <tr>
                        <th>${key + 1}</th>
                        <th>${value.AirLineCode}</th>
                        <th>${value.AirFlyStatus}</th>
                        <th>${edt}</th>
                        <th>${rdt}</th>
                        <th>${updata}</th>
                    </tr>
                    `;
                }

            });
            tbody.append(contentText);
            $('#example').DataTable()

        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    //ajax end

});
$(document).ready(function() {
    var itemsPerPage = 5;
    var rows = $('#myTable tbody tr');
    var numPages = Math.ceil(rows.length / itemsPerPage);
  
    // Create pagination
    var pagination = $('<div class="pagination"></div>');
    for (var i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      var btn = $('<button class="page-number">' + pageNum + '</button>');
      btn.on('click', function() {
        showPage(parseInt($(this).text()));
      });
      pagination.append(btn);
    }
    $('#myTable').after(pagination);
  
    // Show first page
    showPage(1);
  
    function showPage(page) {
      rows.hide();
      rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).show();
    }
  });
