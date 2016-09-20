class ScoresController < ApplicationController

  def index
    @scores = Score.all
  end

  def show
    @score = Score.find(params[:id])
  end

  def create
    @scores = Score.all
    @score = Score.new
    @score.photo_id = 1
    if @score.save
      redirect_to @score
    else
      render :index
    end
  end

end
