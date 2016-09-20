class PhotosController < ApplicationController
  
  def show
    @photo = Photo.first
    @tags = @photo.tags
  end
end
