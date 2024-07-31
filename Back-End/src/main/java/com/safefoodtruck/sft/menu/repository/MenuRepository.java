package com.safefoodtruck.sft.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.safefoodtruck.sft.menu.domain.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {
}
