class TagsController < ApplicationController

  def create
    @tag = Tag.new(whitelisted_params);

    if @tag.save
      delete_character_from_score(whitelisted_params) 
      respond_to do |format|
        format.html {}
        format.json { render json: @tag, status: 200 }
      end
    else
      respond_to do |format|
        format.html { redirect_to score_path(params[:score_id])}
        format.json { render :json }
      end
    end

  end

  def index
    @score = Score.find(params[:id])
    @tags = @score.tags
    respond_to do |format|
      format.html { }
      format.json { render json: @tags, status: 200}
    end
  end


  private 

  def whitelisted_params
    params.permit(:character_name, :x_location, :y_location, :score_id)
  end

  def delete_character_from_score(params)
    score = Score.find(params[:score_id])
    character = params[:character_name]
    
    score.characters.where("name LIKE ?", character).destroy_all
  end

end
