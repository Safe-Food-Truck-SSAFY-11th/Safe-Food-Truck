package com.safefoodtruck.sft.review.domain;

import static jakarta.persistence.FetchType.*;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.safefoodtruck.sft.review.dto.ReviewImageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
	@ManyToOne(fetch = LAZY)
	@MapsId
	@Setter
	@JoinColumn(name = "review_id")
	private Review review;

	@NotNull
	@Column(name = "saved_url")
	private String savedUrl;

	@NotNull
	@Column(name = "saved_path")
	private String savedPath;

	public static ReviewImage of(ReviewImageDto reviewImageDto) {
		return ReviewImage.builder()
			.review(reviewImageDto.review())
			.savedUrl(reviewImageDto.savedUrl())
			.savedPath(reviewImageDto.savedPath())
			.build();
	}
}
