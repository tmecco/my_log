class DiarysController < ApplicationController

  def index
  end

  def create
    @today_diary = Diary.new(set_diary_params) 
    @today_diary.save
  end

  def past
    @params = serectDay_params
    @select_day = Diary.find_by(day: @params)
  end

  private 

  def set_diary_params
    params.permit(:episode, :tomorrow, :memo, :day).merge(user_id: current_user.id)
  end

  def serectDay_params
    params[:select_day]
  end
end
