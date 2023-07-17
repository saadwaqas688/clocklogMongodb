// screen-cast.dto.ts

export class SingleScreenCastDto {
  image: string;
}

export class ScreenCastDto {
  screenCastSlotTime: string;
  userId: string;
  screenCastInGroup: SingleScreenCastDto[];
}
