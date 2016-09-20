class ScoresController < ApplicationController

  def index
    @scores = Score.all
  end

  def show
    @score = Score.find(params[:id])
    @characters = @score.characters
    respond_to do |format|
      format.html {}
      format.json { render json: @characters, status: 200}
    end
  end

  def create
    @scores = Score.all
    @score = Score.new
    characters = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"]
    @score.photo_id = 1
    if @score.save
      characters.each do |character|
        @score.characters.create(name: character)
      end
      redirect_to @score
    else
      render :index
    end
  end

end
