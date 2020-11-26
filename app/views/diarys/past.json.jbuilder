json.day @params

if @select_day != nil
  if @select_day.episode != ""
    json.episode @select_day.episode
  else
    json.episode "何も入力されてないよ"
  end

  if @select_day.tomorrow != "" 
    json.tomorrow @select_day.tomorrow
  else
    json.tomorrow "何も入力されてないよ"
  end

  if @select_day.memo != ""
    json.memo @select_day.memo
  else
    json.memo "何も入力されてないよ"
  end
else
  json.episode "何も入力されてないよ"
  json.tomorrow "何も入力されてないよ"
  json.memo "何も入力されてないよ"
end
