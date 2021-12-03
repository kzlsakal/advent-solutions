Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input) do
    bit_counts =
      input
      |> Enum.reduce(
        %{},
        fn line, acc ->
          line
          |> String.split("", trim: true)
          |> Enum.with_index()
          |> Enum.reduce(acc, fn y, acc2 ->
            idx = elem(y, 1)
            bit = String.to_integer(elem(y, 0))

            Map.update(
              acc2,
              idx,
              [0, 0],
              fn counts -> List.update_at(counts, bit, &(&1 + 1)) end
            )
          end)
        end
      )

    gamma =
      Enum.map(0..(map_size(bit_counts) - 1), fn idx ->
        [count_zero, count_one] = get_in(bit_counts, [idx])
        if count_zero > count_one, do: "0", else: "1"
      end)

    epsilon =
      Enum.map(gamma, fn
        "0" -> "1"
        "1" -> "0"
      end)

    int(gamma) * int(epsilon)
  end

  defp int(bits), do: bits |> Enum.join() |> String.to_integer(2)
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
