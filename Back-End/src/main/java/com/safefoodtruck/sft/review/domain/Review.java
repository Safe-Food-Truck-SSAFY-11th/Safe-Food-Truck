package com.safefoodtruck.sft.review.domain;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.review.dto.request.ReviewRegistRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "review")
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_id")
	private Integer id;

	@NotNull
	@JsonIgnore
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "email")
	private Member customer;

	@NotNull
	@JsonIgnore
	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "order_id")
	private Order order;

	@NotNull
	@Column(name = "is_visible")
	private Boolean isVisible;

	@NotNull
	@Column(name = "star")
	private Integer star;

	@NotNull
	@Column(name = "content")
	private String content;

	@OneToMany(mappedBy = "review",cascade = ALL, orphanRemoval = true)
	List<ReviewImage> reviewImages = new ArrayList<>();

	@JsonProperty("email")
	public String getCustomerEmail() {
		return customer != null ? customer.getEmail() : null;
	}

	@JsonProperty("order_id")
	public Integer getOrderId() {
		return order != null ? order.getId() : null;
	}

	public void setOrder(Order order) {
		this.order = order;
		order.setReview(this);
	}

	public void addReviewImage(ReviewImage reviewImage) {
		this.reviewImages.add(reviewImage);
		reviewImage.setReview(this);
	}

	public static Review of(Member customer, Order order, ReviewRegistRequestDto reviewRegistRequestDto) {
		return Review.builder()
			.customer(customer)
			.order(order)
			.isVisible(reviewRegistRequestDto.isVisible())
			.star(reviewRegistRequestDto.star())
			.content(reviewRegistRequestDto.content())
			.build();
	}
}
