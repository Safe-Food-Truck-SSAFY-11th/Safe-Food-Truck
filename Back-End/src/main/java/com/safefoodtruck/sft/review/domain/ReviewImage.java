package com.safefoodtruck.sft.review.domain;

import static jakarta.persistence.FetchType.LAZY;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.review.dto.ReviewImageDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Table(name = "review_image")
@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_image_id")
	private Integer id;

	@JsonIgnore
	@ManyToOne(fetch = LAZY)
	@Setter
	@JoinColumn(name = "review_id")
	private Review review;

	@Column(name = "saved_url")
	private String savedUrl;

	@Column(name = "saved_path")
	private String savedPath;

	@JsonProperty("review_id")
	public Integer getReviewId() {
		return review != null ? review.getId() : null;
	}

	public static ReviewImage of(ReviewImageDto reviewImageDto) {
		return ReviewImage.builder()
			.review(reviewImageDto.review())
			.savedUrl(reviewImageDto.savedUrl())
			.savedPath(reviewImageDto.savedPath())
			.build();
	}
}
