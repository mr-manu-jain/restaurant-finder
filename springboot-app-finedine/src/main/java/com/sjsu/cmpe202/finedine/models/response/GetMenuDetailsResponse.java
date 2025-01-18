package com.sjsu.cmpe202.finedine.models.response;

import com.sjsu.cmpe202.finedine.entity.MenuItem;
import java.util.List;

public class GetMenuDetailsResponse {
 private List<MenuItem> menuList;
 
 public GetMenuDetailsResponse(List<MenuItem> menuList) {
     this.menuList = menuList;
 }

public List<MenuItem> getMenuList() {
     return menuList;
 }
 
 public void setMenuList(List<MenuItem> menuList) {
     this.menuList = menuList;
 }
}