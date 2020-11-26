import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('turbolinks:load', function() {
  $(".postPage").hide()
  $(".select_calendar").hide()
  var calendarEl = document.getElementById('calendar');
  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin ],
    locale: 'ja',
    height: 'auto',
    firstDay: 0,
    headerToolbar: {
      left: 'today prev', //左側に配置する要素
    center: 'title', //中央に配置する要素
    right: 'next', //
    },
    buttonText: {
      today: '今月',
      month: '月',
      list: 'リスト'
    },

    //ユーザが日付をクリックしたときに行う処理
    //日付をクリックすると、そこにたくさん情報が入っているので
    dateClick: function(info) {
      var selectDay_rails = info.dateStr
      console.log(selectDay_rails)
      var selectDay = new Date(info.dateStr);
      var today = new Date();
      console.log(selectDay,today,selectDay_rails)
      //関数の呼び出し：ComparisonDay(ユーザが選択した日付、今日の日付、railsに渡すユーザの選択日付)
      ComparisonDay(selectDay,today,selectDay_rails);

      //送信ボタンが押された際の非同期通信
      $('.post_formDate').unbind().on('submit', function(e){
        e.preventDefault();
        //送信されたデータをFormDataに格納する
        var formData = new FormData(this);
        //diarysコントローラーのcreateアクションのURLを指定
        var url = "/diarys";

        //送信されたformデータにJSで取得した日付の情報を追加する
        formData.append("day", selectDay_rails)
        console.log(formData)
        
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(){
          console.log("ok")
        })
        .fail(function(){
          console.log("no")
        })
      })
    }
  });
  //calendarの中にはカレンダーの設定が入っている。render()で表示させる
  calendar.render();
});

  //：ComparisonDay(ユーザが選択した日付、今日の日付、railsに渡すユーザの選択日付)
    function ComparisonDay(selectDay,today,selectDay_rails) {
      console.log(selectDay,today,selectDay_rails)
      //選択した日付の、年・月・日をそれぞれ変数に代入
      var selectDay_year = selectDay.getFullYear();
      var selectDay_month = selectDay.getMonth();
      var selectDay_date = selectDay.getDate();
      //今日の日付の、年・月・日をそれぞれ変数に代入
      var today_year = today.getFullYear();
      var today_month = today.getMonth();
      var today_date = today.getDate();
      //以下は選択した日付が、過去・現在・未来のどれなのかを比較するための処理
      if (selectDay_year == today_year){
        if(selectDay_month == today_month){
          if(selectDay_date == today_date){
            console.log("これは今日の日付です")
            $(".home_side_ber").hide()
            $(".postPage").show()
            $(".select_calendar").hide()
          }else if(selectDay_date < today_date){
            console.log("過去の情報")
            selectPastInfo(selectDay_rails)
          }else{
            console.log("未来の情報です")
            $(".home_side_ber").show()
            $(".postPage").hide()
            $(".select_calendar").hide()
          }
        }else if (selectDay_month < today_month){
          console.log("過去の情報")
          selectPastInfo(selectDay_rails)
        }else{
          console.log("未来の情報です")
          $(".home_side_ber").show()
          $(".postPage").hide()
          $(".select_calendar").hide()
        }
      }else if (selectDay_year < today_year){
        console.log("過去の情報")
        selectPastInfo(selectDay_rails)
      }else{
        console.log("未来の情報です")
        $(".home_side_ber").show()
        $(".postPage").hide()
        $(".select_calendar").hide()
      }
    }
    //取得した情報が過去だった場合
    function selectPastInfo(selectDay_rails) {
      console.log(selectDay_rails)
      var rails_data = selectDay_rails;
      var url = "/past";

      $.ajax({
        url: url,
        type: "POST",
        data: {select_day: rails_data},
        dataType: 'json'
      })
      .done(function(data){
        console.log(data)
        $('.selectData-selectDay').html(`<div  class="selectData-selectDay">${data.episode}</div>`)
        $('.selectData-tomorrow').html(`<div  class="selectData-tomorrow">${data.tomorrow}</div>`)
        $('.selectData-memo').html(`<div  class="selectData-memo">${data.memo}</div>`)
        $('.select_day').html(`<div  class=".select_day">${data.day}</div>`)

        $(".home_side_ber").hide()
        $(".postPage").hide()
        $(".select_calendar").show()
      })
      .fail(function(){
        console.log("no")
      })
    }

