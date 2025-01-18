package com.sjsu.cmpe202.finedine.models.request;

public class UpdateMenuRequest {
    private String restaurantId;
    private String title;
    private String description;
    private Double price;
    private String type;
    private Boolean stock;
    private Integer quantity;
    private String category;
    
    
    //Getters and Setters
    
    public String getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}
    public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Boolean getStock() {
		return stock;
	}
	public void setStock(Boolean stock) {
		this.stock = stock;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
}