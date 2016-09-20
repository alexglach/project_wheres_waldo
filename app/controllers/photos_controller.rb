class PhotosController < ApplicationController
  
  def show
    @photo = Photo.first
  end
end
